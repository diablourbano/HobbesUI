import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { COLORS } from '../utils/variables';

const { height } = Dimensions.get('window');

export const MainContainer = styled(SafeAreaView)`
  background-color: ${COLORS.snowWhite};
`;

export const Content = styled.View`
  height: 100%;
  align-items: stretch;
`;

export const MainSection = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: 0;
  width: 100%;
`;

export const SidebarUI = styled.View`
  background-color: ${COLORS.lightGray};
  height: ${height}px;
  padding: 8px;
  padding-bottom: 48px;
`;

export const DrawerScrollView = styled(DrawerContentScrollView)``;

export const LeaveBtn = styled.TouchableOpacity`
  border-color: ${COLORS.mediumRed};
  border-radius: 4px;
  border-width: 1;
  border-style: solid;
  width: 120;
  align-self: flex-end;
  padding-top: 8;
  padding-bottom: 8;
  margin-top: 12;
  margin-right: 12;
`;

export const LeaveLabel = styled.Text`
  font-size: 14px;
  color: ${COLORS.darkGray};
  text-align: center;
`;

export const Footer = styled.KeyboardAvoidingView`
  align-items: center;
  background-color: transparent;
  padding: ${Platform.OS === 'ios' ? 0 : '16px'};
  flex-direction: column;
  justify-content: flex-end;
  margin-top: auto;
  padding: 16px;
  position: relative;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${COLORS.darkGray};
  font-size: 58px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  color: ${COLORS.mediumGray};
  font-size: 40px;
  margin: 15px 0;
`;

export const Note = styled.Text`
  color: ${COLORS.darkGray};
  font-size: 22px;
`;

export const Item = styled.TouchableOpacity`
  padding: ${({ hasPadding }) => !hasPadding ? 0 : '3px 12px'};
  height: 40px;
`;

export const ItemList = styled.Text`
  color: ${COLORS.darkGray};
  font-weight: ${({ isActive }) => !isActive ? 'normal' : 'bold'};
  font-size: 18;
  margin: 5px 10px 5px 20px;
`;

export const Parent = styled.View`
  ${({ levelPosition, sectionColor }) => {
    switch (levelPosition) {
      case 1:
        return `
          margin: 4px 0;
        `;
      case 2:
        return `
          margin: 0 0 4px 16px;
          border-left-width: 1px;
          border-left-color: ${sectionColor};
        `;
      default:
        return '0';
    }
  }};

  ${({ isCollapsed, sectionHeight }) => isCollapsed ? `
    height: ${sectionHeight};
    overflow: hidden;
  ` : ''}
`;

export const ParentSection = styled.TouchableOpacity`
  background-color: ${({ sectionColor }) => sectionColor};
  height: ${({ sectionHeight }) => sectionHeight};
  padding: 3px 12px 3px 20px;
`;

export const ParentName = styled.Text`
  color: ${COLORS.snowWhite};
  font-size: ${({ sectionFontSize }) => sectionFontSize};
  font-weight: bold;
`;

export const FilterComps = styled.TextInput`
  color: ${COLORS.darkGray};
  font-size: 24px;
  margin: 8px 0 16px;
  padding: 0 16px 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${COLORS.mediumGray};
`;

export const SliderButton = styled.Button`
  color: ${COLORS.snowWhite};
  height: 100px;
  width: 300px;
  margin: 0;
`;

export const ButtonView = styled.View`
  background-color: ${COLORS.mediumGrayTransparent};
  left: 0;
  padding: 0;
  position: absolute;
  top: 500;
`;
