import React from 'react';
import { View, Text, Linking } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Footer = () => {
  return (
    <FooterContainer>
      <BrandSection>
        <BrandName>CUSTOS Diretriz</BrandName>
        <Description>Questions? Comments? Concerns?</Description>
        <Contact
          onPress={() => Linking.openURL('mailto:info@custosdiretriz.com')}
        >
          Email us at info@custosdiretriz.com
        </Contact>
      </BrandSection>

      <LinksContainer>
        <LinkSection>
          <SectionTitle>Company</SectionTitle>
          <LinkItem
            onPress={() => {
              /* navigate to Services */
            }}
          >
            Services
          </LinkItem>
          <LinkItem
            onPress={() => {
              /* navigate to About */
            }}
          >
            About
          </LinkItem>
        </LinkSection>

        <LinkSection>
          <SectionTitle>Legal</SectionTitle>
          <LinkItem
            onPress={() => {
              /* navigate to Privacy Policy */
            }}
          >
            Privacy Policy
          </LinkItem>
          <LinkItem
            onPress={() => {
              /* navigate to Terms & Conditions */
            }}
          >
            Terms & Conditions
          </LinkItem>
        </LinkSection>

        <LinkSection>
          <SectionTitle>Resources</SectionTitle>
          <LinkItem
            onPress={() => {
              /* navigate to Docs */
            }}
          >
            Docs
          </LinkItem>
          <LinkItem
            onPress={() => {
              /* navigate to System Status */
            }}
          >
            System Status
          </LinkItem>
        </LinkSection>

        <LinkSection>
          <SectionTitle>Community</SectionTitle>
          <SocialLinks>
            <SocialLink onPress={() => Linking.openURL('https://discord.com')}>
              <Ionicons
                name='logo-discord'
                size={20}
                color='#e6e6e6'
              />
            </SocialLink>
            <SocialLink onPress={() => Linking.openURL('https://twitter.com')}>
              <Ionicons
                name='logo-twitter'
                size={20}
                color='#e6e6e6'
              />
            </SocialLink>
            <SocialLink onPress={() => Linking.openURL('https://linkedin.com')}>
              <Ionicons
                name='logo-linkedin'
                size={20}
                color='#e6e6e6'
              />
            </SocialLink>
            <SocialLink onPress={() => Linking.openURL('https://github.com')}>
              <Ionicons
                name='logo-github'
                size={20}
                color='#e6e6e6'
              />
            </SocialLink>
          </SocialLinks>
        </LinkSection>
      </LinksContainer>

      <FooterNote>© 2024 Custos Diretriz. All rights reserved.</FooterNote>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.View`
  background-color: #1a1a1a;
  padding: 40px 20px;
  width: 100%;
`;

const BrandSection = styled.View`
  margin-bottom: 20px;
`;

const BrandName = styled.Text`
  color: #1db4ff;
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.Text`
  margin: 8px 0;
  font-size: 14px;
  color: #e6e6e6;
`;

const Contact = styled.Text`
  font-size: 14px;
  color: #1db4ff;
  text-decoration: underline;
`;

const LinksContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const LinkSection = styled.View`
  width: 40%;
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 16px;
  color: #f2f2f2;
  margin-bottom: 10px;
  font-weight: bold;
`;

const LinkItem = styled.Text`
  font-size: 14px;
  margin: 4px 0;
  color: #cccccc;
`;

const SocialLinks = styled.View`
  flex-direction: row;
  gap: 12px;
`;

const SocialLink = styled.TouchableOpacity`
  margin-right: 12px;
`;

const FooterNote = styled.Text`
  font-size: 12px;
  color: #7f7f7f;
  text-align: center;
  margin-top: 20px;
`;
