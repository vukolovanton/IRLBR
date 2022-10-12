export class LatLon {
  constructor(lat, lon) {
    this.lat = this.wrap90(Number(lat));
    this.lon = this.wrap180(Number(lon));
  }

  wrap90(degrees) {
    if (-90 <= degrees && degrees <= 90) return degrees; // avoid rounding due to arithmetic ops if within range

    const x = degrees,
      a = 90,
      p = 360;
    return ((4 * a) / p) * Math.abs(((((x - p / 4) % p) + p) % p) - p / 2) - a;
  }

  wrap180(degrees) {
    if (-180 <= degrees && degrees <= 180) return degrees; // avoid rounding due to arithmetic ops if within range

    const x = degrees,
      a = 180,
      p = 360;
    return (((((2 * a * x) / p - p / 2) % p) + p) % p) - a;
  }

  toRadians(num) {
    return (num * Math.PI) / 180;
  }

  toDegrees(num) {
    return (num * 180) / Math.PI;
  }

  destinationPoint(distance, bearing, radius = 6371e3) {
    const δ = distance / radius; // angular distance in radians
    const θ = this.toRadians(Number(bearing));

    const φ1 = this.toRadians(this.lat),
      λ1 = this.toRadians(this.lon);

    const sinφ2 =
      Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ);
    const φ2 = Math.asin(sinφ2);
    const y = Math.sin(θ) * Math.sin(δ) * Math.cos(φ1);
    const x = Math.cos(δ) - Math.sin(φ1) * sinφ2;
    const λ2 = λ1 + Math.atan2(y, x);

    const lat = this.toDegrees(φ2);
    const lon = this.toDegrees(λ2);

    return new LatLon(lat, lon);
  }
}
