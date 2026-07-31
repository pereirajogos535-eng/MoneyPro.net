#!/bin/bash
echo "--- Instalando dependências para MoneyPro ---"
pkg update -y && pkg upgrade -y
pkg install -y php net-tools
echo "Instalação concluída!"
