#!/usr/bin/env bash
set -euo pipefail

# CI build script for FinceptTerminal
# Workaround: aqtinstall fails in container due to missing /dev/shm for Python multiprocessing.
# Solution: Use system Qt6 packages (6.8.2) and FINCEPT_ALLOW_QT_DRIFT=ON.

echo "Installing system Qt6 dependencies..."
sudo apt-get update -qq
sudo apt-get install -y --no-install-recommends \
  qt6-base-dev qt6-charts-dev qt6-tools-dev qt6-websockets-dev \
  qt6-multimedia-dev qt6-speech-dev \
  qt6-base-private-dev qt6-declarative-private-dev qt6-websockets-private-dev \
  libgl1-mesa-dev

echo "Configuring with CMake..."
cd "$(dirname "$0")/fincept-qt"
# Use /usr as prefix so CMake finds configs under /usr/lib/<arch>/cmake/
cmake -B build/linux-release -G Ninja \
  -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_PREFIX_PATH="/usr" \
  -DFINCEPT_ALLOW_QT_DRIFT=ON \
  -DOPENSSL_ROOT_DIR=/usr

echo "Building..."
cmake --build build/linux-release --parallel 2
