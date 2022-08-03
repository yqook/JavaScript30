const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// Put variables in global scope to make them available to the browser console.
const constraints = {
  audio: false,
  video: true
};

// navigator.mediaDevices.getUserMedia(constraints)
//   .then((stream) => {
//     const videoTracks = stream.getVideoTracks();
//     console.log(videoTracks)
//     stream.onremovetrack = () => {
//       console.log('Stream ended');
//     };
//     video.srcObject = stream;
//     video.onloadedmetadata = () => {
//         video.play();
//     }
//   })
//   .catch((error) => {
//     if (error.name === 'ConstraintNotSatisfiedError') {
//       console.error(
//         `The resolution ${constraints.video.width.exact}x${constraints.video.height.exact} px is not supported by your device.`
//       );
//     } else if (error.name === 'PermissionDeniedError') {
//       console.error(
//         'Permissions have not been granted to use your camera and ' +
//           'microphone, you need to allow the page access to your devices in ' +
//           'order for the demo to work.'
//       );
//     } else {
//       console.error(`getUserMedia error: ${error.name}`, error);
//     }
//   });
