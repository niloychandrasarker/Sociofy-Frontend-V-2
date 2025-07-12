import { io } from 'socket.io-client';

class WebSocketService {
    constructor() {
        this.socket = null;
        this.isConnected = false;
    }

    connect(userId) {
        if (this.socket) {
            this.disconnect();
        }

        const token = localStorage.getItem('jwt');
        this.socket = io('http://localhost:5454', {
            auth: {
                token: token
            },
            query: {
                userId: userId
            }
        });

        this.socket.on('connect', () => {
            console.log('Connected to WebSocket server');
            this.isConnected = true;
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
            this.isConnected = false;
        });

        this.socket.on('error', (error) => {
            console.error('WebSocket error:', error);
        });

        return this.socket;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.isConnected = false;
        }
    }

    // Message events
    onNewMessage(callback) {
        if (this.socket) {
            this.socket.on('new_message', callback);
        }
    }

    onMessageDelivered(callback) {
        if (this.socket) {
            this.socket.on('message_delivered', callback);
        }
    }

    onMessageRead(callback) {
        if (this.socket) {
            this.socket.on('message_read', callback);
        }
    }

    onUserOnline(callback) {
        if (this.socket) {
            this.socket.on('user_online', callback);
        }
    }

    onUserOffline(callback) {
        if (this.socket) {
            this.socket.on('user_offline', callback);
        }
    }

    onTyping(callback) {
        if (this.socket) {
            this.socket.on('typing', callback);
        }
    }

    onStopTyping(callback) {
        if (this.socket) {
            this.socket.on('stop_typing', callback);
        }
    }

    // Emit events
    sendMessage(messageData) {
        if (this.socket && this.isConnected) {
            this.socket.emit('send_message', messageData);
        }
    }

    markMessageAsRead(messageId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('mark_as_read', { messageId });
        }
    }

    startTyping(chatId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('typing', { chatId });
        }
    }

    stopTyping(chatId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('stop_typing', { chatId });
        }
    }

    joinChat(chatId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('join_chat', { chatId });
        }
    }

    leaveChat(chatId) {
        if (this.socket && this.isConnected) {
            this.socket.emit('leave_chat', { chatId });
        }
    }

    // Remove event listeners
    removeAllListeners() {
        if (this.socket) {
            this.socket.removeAllListeners();
        }
    }
}

export default new WebSocketService();