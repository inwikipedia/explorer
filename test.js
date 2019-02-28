var ws = new WebSocket('http://localhost:8082')

ws.onopen = () => {
  console.log(123)
}