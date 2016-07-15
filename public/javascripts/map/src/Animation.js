var animation = {}

animation.update = function() {

}

animate();

function animate() {
  requestAnimationFrame(animate);
  animation.update()
}

