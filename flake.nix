{
  description = "realm's nix flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = { self, nixpkgs }:
  let
    pkgs = nixpkgs.legacyPackages."aarch64-darwin";
  in
  {
    devShells."aarch64-darwin".default = pkgs.mkShell {
      packages = [
        pkgs.nodejs
        pkgs.pnpm
      ];

      shellHook = ''
        echo "Welcome to the devShell!"
      '';
    };
  };
}
