import { useTranslation } from "react-i18next";
import { useAppSelector } from "../@redux/hooks";
import { useFetchMessagesQuery } from "../model/messages/messages.api";

const ChannelInfo = () => {
  const { data: messages } = useFetchMessagesQuery();

  const selectedChannel = useAppSelector(
    (state) => state.channels.selectedChannel,
  );

  const { t } = useTranslation();

  const messagesQty = messages?.filter(
    ({ channelId }) => channelId === selectedChannel?.id,
  ).length;

  const name = selectedChannel?.name ?? "";

  const getMessagesText = (count: number) => {
    const cases = [2, 0, 1, 1, 1, 2];
    const titles = ["сообщение", "сообщения", "сообщений"];
    const title =
      titles[
        count % 100 > 4 && count % 100 < 20
          ? 2
          : cases[Math.min(count % 10, 5)] || 0
      ];
    return `${count} ${title}`;
  };

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>{`# ${name}`}</b>
      </p>
      <span className="text-muted">{getMessagesText(messagesQty ?? 0)}</span>
    </div>
  );
};

export { ChannelInfo };
