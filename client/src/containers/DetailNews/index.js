import { FacebookOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
import { Layout } from "../../components/Layout";
import "./style.css";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import { Link } from "react-router-dom";
const { Title, Paragraph, Text } = Typography;
function DetailNews() {
  return (
    <div>
      <Layout>
        <div style={{ margin: "20px 100px" }}>
          <Typography>
            <Title level={2} style={{ alignItems: "center" }} strong>
              Xuất hiện bản mod cho bạn tung hoành Doom như vị thần giáng thế
              chinh phạt vùng đất quỷ dữ
            </Title>
            <Text strong style={{ fontSize: "12px" }}>
              By Axium Fox -28/08/2022
            </Text>
            <div>
              <FacebookShareButton
                className="buttonShare"
                hashtag="truongdeptrai"
                url="https://laptopshopv1.netlify.app/"
                quote="trường đẹp trai"
              >
                <FacebookIcon size={40} borderRadius={2} />
              </FacebookShareButton>
              <TwitterShareButton
                className="buttonShare"
                url="https://laptopshopv1.netlify.app/"
                title="trường đẹp trai"
              >
                <TwitterIcon size={40} borderRadius={2} />
              </TwitterShareButton>
              <PinterestShareButton className="buttonShare">
                <PinterestIcon size={40} borderRadius={2} />
              </PinterestShareButton>
              <WhatsappShareButton
                className="buttonShare"
                url="https://laptopshopv1.netlify.app/"
                title="trường đẹp trai"
                separator=":: "
              >
                <WhatsappIcon size={40} borderRadius={2} />
              </WhatsappShareButton>
            </div>
            <Paragraph>
              In the process of internal desktop applications development, many
              different design specs and implementations would be involved,
              which might cause designers and developers difficulties and
              duplication and reduce the efficiency of development.
            </Paragraph>
            <Paragraph>
              After massive project practice and summaries, Ant Design, a design
              language for background applications, is refined by Ant UED Team,
              which aims to{" "}
              <Text strong>
                uniform the user interface specs for internal background
                projects, lower the unnecessary cost of design differences and
                implementation and liberate the resources of design and
                front-end development
              </Text>
              .
            </Paragraph>
          </Typography>
          <hr
            style={{
              background: "black",
              color: "black",
              borderColor: "lime",
              height: "3px",
              marginBottom: "20px",
            }}
          />
          <Text strong italic style={{ fontSize: "15px" }}>
            Mời các bạn theo dõi fanpage của chúng mình theo đường link dưới đây
            để cập nhật những tin tức về game, công nghệ và nhiều thông tin thú
            vị khác nữa nhé!
          </Text>

          <Title level={3} style={{ textAlign: "center" }}>
            <Link to="/" style={{ color: "black" }}>
              SHOP LAPTOP
            </Link>
          </Title>
        </div>
      </Layout>
    </div>
  );
}

export default DetailNews;
