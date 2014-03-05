$(function () {
    var chatHub = $.connection.ChatHub;
    var enterKey = 13;

    var chat = {
        Init: function (params) {
            chat._user = params.UserControl;
            chat._txtMessageId = params.MessageText;
            chat._recieverControl = params.RecieverControl;
            chat._contentMessages = params.ContentMessages;
            
            chatHub.client.Response = function (data) {
                chat.Response(data);
            };

            chatHub.client.Alert = function () {
                chat.Alert();
            };

            chatHub.client.Disconnect = function () {
                chat.Disconnect();
            };

            $(chat._txtMessageId).keypress(function () {
                if (event.keyCode == enterKey) {
                    chat.Send();
                }
            });

            chat.Connect();
        },

        Connect: function () {
            $.connection.hub.start();
        },

        Disconnect: function () {
            alert("You are disconnected");
        },

        Send: function () {
            var data = {
                Sender: $(chat._user).val(),
                Message: $(chat._txtMessageId).val(),
                TimeStamp: chat.GetFormattedDate()
            };

            chatHub.server.Send(data);

            $(chat._recieverControl).append(chat.CreateMessageHtml("right", $(chat._user).val(), $(chat._txtMessageId).val(), data.TimeStamp));
            $(chat._txtMessageId).val('').focus();
            $(chat._contentMessages).scrollTop($(chat._recieverControl).height());
        },

        Response: function (data) {
            var encodedName = $('<div />').text(data.Sender).html();
            var encodedMsg = $('<div />').text(data.Message).html();
            $(chat._recieverControl).append(chat.CreateMessageHtml("left", encodedName, encodedMsg, data.TimeStamp));
            $(chat._contentMessages).scrollTop($(chat._recieverControl).height());
        },

        Alert: function () {
           // alert("mensajeNuevo");
        },

        CreateMessageHtml: function (postion, name, message, timeStamp) {
            return '<li>' +
		                '<div>' +
	                        '<div class="name ' + postion + '">' +
		    	                '<label class="label">' +
	            	                '<strong>' + name + '</strong>' +
	                            '</label>' +
	                        '</div>' +
		  	                '<div class="message ' + postion + '">' +
		  		                '<div class="arrow arrow' + postion + '">&#9650;</div>' +
		    	                '<div class="content ' + postion + '">' +
                                    '<div>' + message + '</div>' +
                                    '<div class="timeStamp">' + timeStamp + '</div>' +
                                '</div>' +
		  	                '</div>' +
	  	                '</div>' +
	              '</li>';
        },

        GetFormattedDate: function () {

            var weekday = new Array(7);
            weekday[0] = "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";

            var month = new Array(11);
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            
            var date = new Date();
            
            var str = weekday[date.getDay()] + ", " + 
                    + date.getHours() + ":" + date.getMinutes() + " "
                    + (date.getHours() > 12 ? "PM" : "AM");

            return str;
        }
    };

    chat.Init({
        UserControl: "#txtUser",
        MessageText: "#txtMessage",
        RecieverControl: '#messages',
        ContentMessages: '#contentMessages'
    });
});