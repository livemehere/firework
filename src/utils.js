export function rand(min, max) {
  return Math.random() * (max - min) + min;
}

export function degToRad(deg) {
  return (Math.PI / 180) * deg;
}
