export interface AuthenticationResponse<D> {
  data: D & {token: string}
}