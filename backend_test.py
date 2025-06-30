import requests
import unittest
import os
import json
import time
from io import BytesIO
from PIL import Image
import numpy as np

class RoopCamUltraProAPITest(unittest.TestCase):
    def setUp(self):
        # Get the backend URL from the frontend .env file
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    self.base_url = line.strip().split('=')[1]
                    break
        
        # Create test image
        self.test_image = self._create_test_image()
        self.test_audio = self._create_test_audio()
    
    def _create_test_image(self):
        """Create a simple test image"""
        img = Image.new('RGB', (100, 100), color='red')
        img_io = BytesIO()
        img.save(img_io, 'JPEG')
        img_io.seek(0)
        return img_io
    
    def _create_test_audio(self):
        """Create a simple test audio file"""
        # Create a simple sine wave
        sample_rate = 22050
        duration = 1.0  # seconds
        t = np.linspace(0, duration, int(sample_rate * duration), endpoint=False)
        audio = 0.5 * np.sin(2 * np.pi * 440 * t)  # 440 Hz sine wave
        
        # Convert to bytes
        audio_bytes = BytesIO()
        audio_bytes.write(b'RIFF')
        audio_bytes.write((36 + len(audio) * 2).to_bytes(4, 'little'))  # File size
        audio_bytes.write(b'WAVE')
        audio_bytes.write(b'fmt ')
        audio_bytes.write((16).to_bytes(4, 'little'))  # Subchunk1Size
        audio_bytes.write((1).to_bytes(2, 'little'))  # AudioFormat (PCM)
        audio_bytes.write((1).to_bytes(2, 'little'))  # NumChannels
        audio_bytes.write((sample_rate).to_bytes(4, 'little'))  # SampleRate
        audio_bytes.write((sample_rate * 2).to_bytes(4, 'little'))  # ByteRate
        audio_bytes.write((2).to_bytes(2, 'little'))  # BlockAlign
        audio_bytes.write((16).to_bytes(2, 'little'))  # BitsPerSample
        audio_bytes.write(b'data')
        audio_bytes.write((len(audio) * 2).to_bytes(4, 'little'))  # Subchunk2Size
        
        # Convert float audio to int16
        audio_int = (audio * 32767).astype(np.int16)
        audio_bytes.write(audio_int.tobytes())
        
        audio_bytes.seek(0)
        return audio_bytes
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        response = requests.get(f"{self.base_url}/api/")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("message", data)
        self.assertIn("version", data)
        self.assertIn("features", data)
        print("✅ Root endpoint test passed")
    
    def test_face_detection(self):
        """Test face detection endpoint"""
        files = {'image': ('test.jpg', self.test_image, 'image/jpeg')}
        response = requests.post(f"{self.base_url}/api/face/detect", files=files)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("faces_detected", data)
        self.assertIn("faces", data)
        self.assertIn("processing_time", data)
        self.assertIn("model_used", data)
        self.assertIn("confidence_avg", data)
        print("✅ Face detection test passed")
    
    def test_face_embeddings(self):
        """Test face embeddings extraction endpoint"""
        files = {'image': ('test.jpg', self.test_image, 'image/jpeg')}
        response = requests.post(f"{self.base_url}/api/face/embeddings", files=files)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("success", data)
        self.assertIn("embeddings", data)
        self.assertIn("processing_time", data)
        self.assertIn("model", data)
        print("✅ Face embeddings test passed")
    
    def test_advanced_face_swap(self):
        """Test advanced face swap endpoint"""
        files = {
            'source': ('source.jpg', self.test_image, 'image/jpeg'),
            'target': ('target.jpg', self.test_image, 'image/jpeg')
        }
        data = {
            'quality': 'ultra',
            'full_body': 'false',
            'cloud_processing': 'true'
        }
        response = requests.post(f"{self.base_url}/api/face/advanced-swap", files=files, data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('Content-Type'), 'image/png')
        self.assertIn('X-Processing-Time', response.headers)
        self.assertIn('X-Quality', response.headers)
        print("✅ Advanced face swap test passed")
    
    def test_realtime_face_swap(self):
        """Test real-time face swap endpoint"""
        # First get embeddings
        files = {'image': ('test.jpg', self.test_image, 'image/jpeg')}
        embed_response = requests.post(f"{self.base_url}/api/face/embeddings", files=files)
        self.assertEqual(embed_response.status_code, 200)
        embeddings = embed_response.json()['embeddings']
        
        # Now test real-time swap
        files = {
            'target': ('target.jpg', self.test_image, 'image/jpeg'),
        }
        data = {
            'source_embeddings': json.dumps(embeddings),
            'full_body': 'false',
            'cloud_processing': 'true'
        }
        response = requests.post(f"{self.base_url}/api/face/realtime-swap", files=files, data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('Content-Type'), 'image/jpeg')
        self.assertIn('X-Processing-Time', response.headers)
        self.assertIn('X-Realtime', response.headers)
        print("✅ Real-time face swap test passed")
    
    def test_voice_conversion(self):
        """Test voice conversion endpoint"""
        files = {'audio': ('test.wav', self.test_audio, 'audio/wav')}
        data = {'target_voice': 'male_deep'}
        response = requests.post(f"{self.base_url}/api/voice/convert", files=files, data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('Content-Type'), 'audio/wav')
        self.assertIn('X-Processing-Time', response.headers)
        self.assertIn('X-Target-Voice', response.headers)
        print("✅ Voice conversion test passed")
    
    def test_realtime_voice_process(self):
        """Test real-time voice processing endpoint"""
        files = {'audio': ('test.wav', self.test_audio, 'audio/wav')}
        data = {
            'target_voice': 'female_high',
            'low_latency': 'true'
        }
        response = requests.post(f"{self.base_url}/api/voice/realtime-process", files=files, data=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.headers.get('Content-Type'), 'audio/ogg')
        self.assertIn('X-Processing-Time', response.headers)
        self.assertIn('X-Realtime', response.headers)
        print("✅ Real-time voice processing test passed")
    
    def test_webrtc_offer(self):
        """Test WebRTC offer endpoint"""
        data = {
            "type": "offer",
            "sdp": "v=0\r\no=- 1234567890 1 IN IP4 127.0.0.1\r\n..."
        }
        response = requests.post(f"{self.base_url}/api/webrtc/offer", json=data)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("success", data)
        self.assertIn("answer", data)
        self.assertIn("ice_servers", data)
        print("✅ WebRTC offer test passed")
    
    def test_social_platform_connect(self):
        """Test social platform connection endpoint"""
        platforms = ['whatsapp', 'tiktok', 'instagram', 'facebook']
        for platform in platforms:
            credentials = {
                "username": "test_user",
                "password": "test_password",
                "token": "test_token"
            }
            response = requests.post(f"{self.base_url}/api/social/connect/{platform}", json=credentials)
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIn("success", data)
            self.assertIn("platform", data)
            self.assertIn("connected", data)
            self.assertIn("features", data)
        print("✅ Social platform connection test passed")
    
    def test_performance_stats(self):
        """Test performance stats endpoint"""
        response = requests.get(f"{self.base_url}/api/performance/stats")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("cpu_usage", data)
        self.assertIn("memory_usage", data)
        self.assertIn("gpu_usage", data)
        self.assertIn("processing_fps", data)
        print("✅ Performance stats test passed")
    
    def test_model_performance(self):
        """Test model performance endpoint"""
        response = requests.get(f"{self.base_url}/api/performance/models")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("face_detection", data)
        self.assertIn("face_swap", data)
        self.assertIn("voice_conversion", data)
        self.assertIn("full_body_tracking", data)
        print("✅ Model performance test passed")

if __name__ == "__main__":
    unittest.main()