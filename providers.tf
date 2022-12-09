terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.10.0"
    }
  }

  backend "s3" {
    bucket = "ngrok-updater-terraform-state"
    key    = "terraform.tfstate"
    region = "eu-west-1"
  }

}

provider "aws" {
  region = "eu-west-1"
}
