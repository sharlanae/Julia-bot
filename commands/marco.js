module.exports = {
    name: 'marco',
    description: "this is a marco command",
    execute(message, args){
        message.channel.send('polo');
    }
}