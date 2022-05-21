import { useSession } from "next-auth/react";
import { Client } from "stompjs";

const Message = (props) => {
  console.log("accepted", props.teamId, props.notificationId);

  const { data: session } = useSession();

  const acceptJoinRequest = () => {
    console.log("accepted", props.teamId, props.notificationId);
    props.stompClient?.publish({
      destination: "/app/team/notify/accept",
      body: JSON.stringify({
        userID: session?.userId,
        teamID: props.teamId,
        notificationID: props.notificationId, // Id of the notification you got
      }),
    });
  };

  const declineJoinRequest = () => {
    props.stompClient?.publish({
      destination: "/app/team/notify/reject",
      body: JSON.stringify({
        userID: session?.userId,
        teamID: props.teamId,
        notificationID: props.notificationId, // Id of the notification you got
      }),
    });
  };

  return (
    <div>
      <p>{props.message}</p>
      <button type="button" onClick={acceptJoinRequest}>
        Accept
      </button>
      <button type="button" onClick={declineJoinRequest}>
        Decline
      </button>
    </div>
  );
};

export default Message;
