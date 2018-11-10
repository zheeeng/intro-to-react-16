export default function clamp (min: number, max: number, includes = true) {
  const lowerBound = min
  const upperBound = includes ? max : max - 1

  return (value: number) => (value < lowerBound) ? lowerBound : (value >= upperBound) ? upperBound : value
}
