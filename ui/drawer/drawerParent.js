import React, { Component } from 'react';
import { COLORS } from '../../utils/variables';
import * as styled from '../styles';

class DrawerSection extends Component {
  state = {
    isCollapsed: true,
  };

  componentDidUpdate(prevProps) {
    const { shouldCollapse: prevShouldCollapse } = prevProps;
    const { shouldCollapse } = this.props;

    if (shouldCollapse !== prevShouldCollapse) {
      this.setCollapsedTo(shouldCollapse);
    }
  }

  toggleCollapsed = () => {
    const { isCollapsed: wasCollapsed } = this.state;
    this.setCollapsedTo(!wasCollapsed);
  };

  setCollapsedTo(state) {
    this.setState({ isCollapsed: state });
  }

  render() {
    const {
      children,
      title,
      sectionColor,
      sectionHeight,
      sectionFontSize,
      levelPosition,
    } = this.props;
    const { isCollapsed } = this.state;

    return (
      <styled.Parent
        isCollapsed={isCollapsed}
        sectionHeight={sectionHeight}
        levelPosition={levelPosition}
        sectionColor={sectionColor}
      >
        <styled.ParentSection
          sectionColor={sectionColor}
          sectionHeight={sectionHeight}
          onPress={this.toggleCollapsed}
        >
          <styled.ParentName
            sectionFontSize={sectionFontSize}
          >
            {title}
          </styled.ParentName>
        </styled.ParentSection>

        {children}
      </styled.Parent>
    );
  }
}

DrawerSection.defaultProps = {
  sectionColor: COLORS.darkGray,
  sectionHeight: 32,
  sectionFontSize: 20,
  levelPosition: 1,
};

export default DrawerSection;
