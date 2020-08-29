/*
#all logs
channelCreate
channelDelete
channelUpdate
emojiCreate
emojiDelete
emojiUpdate
guildBanAdd
guildBanRemove
guildCreate
guildDelete
guildUpdate
inviteCreate
inviteDelete
message
messageDelete
messageDeleteBulk
messageReactionAdd
messageReactionRemove
messageReactionRemoveAll
messageReactionRemoveEmoji
messageUpdate
roleCreate
roleDelete
roleUpdate
userUpdate
warn

#database table:
channel
emoji
guild
invite
message
role
userUpdate
warn
*/

//structs
var st_log = {
  message_type: "", //string
  channel_name: "", //string
  server_name: "", //string
  content: "", //string
  human_time: "", //string
  utc: "", //int
  utc_offset: "", //int
  author_id: "", //int
  author_username: "", //string
  discriminator: "", //int
}

var st_channel = {
  channel_type: "", //string
  id: "", //int
  channel_name: "", //string
  server_name: "", //string
  human_time: "", //string
  utc: "", //int
  utc_offset: "", //int
  author_id: "", //int
  author_username: "", //string
  discriminator: "", //int
}