import styled from "styled-components";
import Text from "../components/generic/Text";
import { ReactComponent as Phone } from "./images/phone.svg";
import { ReactComponent as Address } from "./images/address.svg";
import { ReactComponent as Clock } from "./images/clock.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrganization } from "../http/cardApi";
import { OrganizationType } from "../types";

export default function Organization() {
  const { organization } = useParams();
  const [currOrganization, setCurrOrganization] =
    useState<OrganizationType>(null);

  useEffect(() => {
    fetchOrganization(organization).then((data) => setCurrOrganization(data));
  }, [organization]);

  return (
    <Block>
      {currOrganization ? (
        <>
          <Title>{currOrganization.name}</Title>
          <Container>
            <OtherImages>
              <div>
                <MainImage
                  src={`http://localhost:5000/${currOrganization.photo1}`}
                  alt="mainImage"
                />
                <OtherImages>
                  <SmallImage
                    src={`http://localhost:5000/${currOrganization.photo2}`}
                    alt="secondaryImage"
                  />
                  <SmallImage
                    src={`http://localhost:5000/${currOrganization.photo3}`}
                    alt="secondaryImage"
                  />
                  <SmallImage
                    src={`http://localhost:5000/${currOrganization.photo4}`}
                    alt="secondaryImage"
                  />
                  <SmallImage
                    src={`http://localhost:5000/${currOrganization.photo5}`}
                    alt="secondaryImage"
                  />
                </OtherImages>
              </div>
              <Text pl={80} size={15} color="#FAFAFA" lh={26}>
                {currOrganization.description}
              </Text>
            </OtherImages>
            <Text
              pt={20}
              pb={20}
              size={15}
              underline
              onClick={() =>
                (window.location.href = `https://${currOrganization.webSite}`)
              }
            >
              {currOrganization.webSite}
            </Text>
            <Description>
              <div>
                <Subtitle>
                  <Phone />
                  <Text pl={10} size={15}>
                    Контактные данные:
                  </Text>
                </Subtitle>
                {currOrganization.phone.split(",").map((phone) => {
                  return (
                    <Text key={phone} pt={5} size={13}>
                      {phone}
                    </Text>
                  );
                })}
              </div>
              <div>
                <Subtitle>
                  <Address />
                  <Text pl={10} size={13}>
                    Адрес:
                  </Text>
                </Subtitle>
                <Text pb={20} pt={10} size={11}>
                  {currOrganization.organizationAddress}
                </Text>
                <Subtitle>
                  <Clock />
                  <Text pl={10} size={13}>
                    Время работы:
                  </Text>
                </Subtitle>
                <Text pt={10} size={11}>
                  Ежедневно, 10:00–20:00
                </Text>
              </div>
            </Description>
          </Container>
        </>
      ) : (
        <Text pt={60} pb={300} size={60}>
          Загрузка...
        </Text>
      )}
    </Block>
  );
}

const Block = styled.div`
  background-color: #004945;
`;

const SmallImage = styled.img`
  margin-top: 15px;
  width: 115px;
  height: 78px;
`;

const OtherImages = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Description = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;

const Title = styled.h2`
  color: #c1a875;
  font-size: 48px;
  line-height: 59px;
  position: relative;
  padding-left: 132px;
  padding: 40px 0 0 80px;

  &::after {
    position: absolute;
    content: "";
    width: 659px;
    left: 0;
    bottom: -10px;
    height: 1.5px;
    background-color: #c1a875;
  }
`;

const Container = styled.div`
  max-width: 1400px;
  padding: 20px;
  margin: 0 auto;
  padding-top: 50px;
`;

const MainImage = styled.img`
  width: 480px;
  height: 300px;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
`;
