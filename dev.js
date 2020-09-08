/*
#all logs

#used:
message
channelCreate
channelDelete
channelUpdate

#not a used:
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
var st_message = {
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
  channel_name: "", //string
  server_name: "", //string
  human_time: "", //string
  utc: "", //int
  utc_offset: "", //int
  author_id: "", //int
  author_username: "", //string
  discriminator: "", //int
  channel_event: "", //string
}

var st_guild = {
  server_name: "", //string
  human_time: "", //string
  utc: "", //int
  utc_offset: "", //int
  executor_id: "", //int
  executor_username: "", //string
  executor_discriminator: "", //int
  target_id: "", //int
  target_username: "", //string
  target_discriminator: "", //int
  action: "", //string
  reason: "", //string | null in guildBanRemove
}
