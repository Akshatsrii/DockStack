provider "digitalocean" {
  token = var.do_token
}

resource "digitalocean_droplet" "server" {
  image  = "ubuntu-22-04-x64"
  name   = "dockstack-server"
  region = "blr1"
  size   = "s-1vcpu-1gb"

  ssh_keys = [
    var.ssh_fingerprint
  ]
}

output "server_ip" {
  value = digitalocean_droplet.server.ipv4_address
}