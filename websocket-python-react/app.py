import asyncio
import websockets

async def echo(websocket, path):
    async for message in websocket:
        await websocket.send(message)

async def main():
    async with websockets.serve(echo, "127.0.0.1", 8765):
        await asyncio.Future()  # run forever

asyncio.run(main())
