#!/bin/bash
IP_ADDRESS=$(ifconfig wlan0 | grep 'inet ' | awk '{print $2}')
if [ -z "$IP_ADDRESS" ]; then
    IP_ADDRESS=$(ip a | grep 'inet ' | grep -v '127.0.0.1' | head -n 1 | awk '{print $2}' | cut -d/ -f1)
fi
echo "------------------------------------------------"
echo "Acesse de outro dispositivo: http://$IP_ADDRESS:8080"
echo "------------------------------------------------"
