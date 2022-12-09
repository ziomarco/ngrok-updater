# ngrok Lambda Updater

## Description

In order to use Alexa integration with Home Assistant (without Naba Cloud) I setup an ngrok container _(using free plan)_ on my Proxmox home server along to Home Assistant VM.

This lambda will be needed for [haaska](https://github.com/mike-grant/haaska) lambda to always have updated Hass.io Proxied endpoint (when container crashes/server restarts).

## Technologies

- Terraform
- AWS Lambda
- ngrok API
