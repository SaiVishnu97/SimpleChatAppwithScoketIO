const Express=require('express');
const Http=require('http');
const bodyParser=require('body-parser');
const cors=require('cors');
const {Server}=require('socket.io');

const app=Express();
app.use(cors());
const server=Http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ['GET','POST']
    }
});

io.on('connection',(socket)=>
{
    console.log(`User connected with id: ${socket.id}`);
    socket.on('join__room',(data)=>{
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
    socket.on('send_message',(data)=>{
        socket.to(data.room).emit('receive_message',data);
    });
    socket.on('disconnected',()=>{
        console.log('User disconnected',socket.id);
    });
}
);

server.listen(3001,()=>console.log('Server started listening on port:','3001'));
