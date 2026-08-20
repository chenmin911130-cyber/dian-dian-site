export function ContactChannels({ locale }) {
  const zh = locale !== "en";

  return (
    <div className="contact-channels">
      <figure className="contact-card">
        <img
          src="/images/wechat-qr.png"
          alt={zh ? "微信：点点（好运版）" : "WeChat: DianDian"}
        />
        <figcaption>
          <strong>{zh ? "微信" : "WeChat"}</strong>
          <span>点点（好运版）</span>
          <small>{zh ? "扫码添加好友" : "Scan to add"}</small>
        </figcaption>
      </figure>
      <figure className="contact-card">
        <img
          src="/images/douyin-qr.png"
          alt={zh ? "抖音：@点点儿 Yudita" : "Douyin: @点点儿 Yudita"}
        />
        <figcaption>
          <strong>{zh ? "抖音" : "Douyin"}</strong>
          <span>@点点儿 Yudita</span>
          <small>{zh ? "抖音号 21726717" : "ID 21726717"}</small>
        </figcaption>
      </figure>
    </div>
  );
}
