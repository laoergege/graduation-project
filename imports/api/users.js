if (Meteor.isServer) {
    Meteor.publish('Meteor.users.initials', function () {
        if (Meteor.userId) {
            if (Meteor.user() && Meteor.user().profile.roles.indexOf(1)) { 
                return Meteor.users.find({}, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1 } })
            }else{
                return Meteor.users.find({_id: Meteor.userId()}, { fields: { _id: 1, username: 1, email: 1, profile: 1, permissions: 1 } })
            }
        }else{
            return this.ready();
        }
    })    
}
