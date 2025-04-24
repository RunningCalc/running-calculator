const table = {
  100: [10.8, 11, 11.2, 11.4, 11.6, 11.8, 12, 12.2, 12.4, 12.6, 12.8, 13, 13.2, 13.4, 13.6, 13.8, 14, 14.2, 14.4, 14.6, 14.8, 15, 15.2, 15.4, 15.6, 15.8, 16, 16.2, 16.4, 16.6, 16.8, 17, 17.2, 17.4, 17.6, 17.8, 18],
  200: [22, 22.4, 22.9, 23.3, 23.7, 24.1, 24.6, 25, 25.4, 25.9, 26.3, 26.7, 27.1, 27.5, 28, 28.4, 28.9, 29.3, 29.7, 30.1, 30.6, 31.2, 31.6, 32.1, 32.5, 32.9, 33.4, 33.9, 34.5, 35, 35.5, 36.1, 36.6, 37.1, 37.6, 38, 38.4],
  400: [49.4, 50.5, 51.6, 52.6, 53.7, 54.8, 56, 57, 58.1, 59.2, 60.3, 61.4, 62.5, 63.6, 64.8, 65.9, 67.1, 68.3, 69.3, 70.4, 71.8, 73.2, 74.3, 75.5, 76.7, 77.9, 79.1, 80.5, 81.9, 83.3, 84.7, 86.1, 87.3, 88.5, 89.8, 91.1, 92.4],
  800: [114.5, 117.2, 120.1, 122.6, 125.4, 128, 131.2, 133.8, 136.6, 139.4, 142.4, 144.2, 148.1, 151.1, 154, 157.1, 160.2, 163.5, 166.3, 169.1, 172.8, 176.6, 178.8, 183, 186.2, 189.4, 192.7, 196.4, 199.3, 203.8, 208.3, 212.8, 217.3, 221.8, 226.4, 231, 234],
  1600: [257.8, 264.1, 270.8, 276.7, 283.2, 289.8, 297.2, 303.6, 310.2, 317.1, 324.3, 330.9, 338.1, 345.3, 352.4, 359.9, 367.6, 375.7, 382.4, 389.4, 398.5, 408, 417.7, 427.4, 437.1, 446.8, 456.5, 469.3, 481.1, 494.2],
  3200: [557.4, 571.6, 586.9, 599.9, 614.1, 629, 645.7, 659.9, 674.8, 690.4, 706.8, 720.8, 737.8, 754.3, 770.5, 787.4, 804.1, 823.6, 839, 855, 875.8, 897.8, 917.3, 936.8, 956.4, 976, 995.5, 1009.3, 1023.1, 1036.9, 1050.7, 1064.6, 1089.3, 1114, 1138.7]
}

function predict() {
  const inDist = Number(document.getElementById("inputDistance").value)
  const inTime = parseFloat(document.getElementById("inputTime").value)
  const outDist = parseInt(document.getElementById("outputDistance").value)

  const col = table[inDist]
  const outCol = table[outDist]

  if (!col || !outCol) {
    document.getElementById("result").textContent = "Unsupported distance"
    return
  }

  let i = 0
  while (i < col.length - 1 && !(col[i] <= inTime && inTime <= col[i + 1])) {
    i++
  }
  if (i >= col.length - 1) {
    i = col.length - 2 // extrapolate beyond last pair
  }
  if (inTime < col[0]) {
    i = 0 // extrapolate below first pair
  }
  const ratio = (inTime - col[i]) / (col[i + 1] - col[i])
  const predicted = outCol[i] + ratio * (outCol[i + 1] - outCol[i])

  document.getElementById("result").textContent = `Predicted time: ${predicted.toFixed(2)} seconds`
}
