import asyncio
import websockets

async def send_message():
    async with websockets.connect('ws://127.0.0.1:3000/') as websocket:
        message = 'Hello, server!'
        await websocket.send(message)
        print(f'Sent message to server: {message}')
        response = await websocket.recv()
        print(f'Received message from server: {response}')

asyncio.run(send_message())
