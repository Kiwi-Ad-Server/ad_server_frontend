import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

/**
 * Shared Loader component for application-wide use.
 *
 * @param {Object} props Properties passed to the Loader component.
 * @param {boolean} props.active Determines if the Loader is active.
 * @param {string} props.size The size of the Loader.
 * @param {string} props.content Text content to display inside the Loader.
 * @param {boolean} props.inverted Whether the Loader should be inverted.
 * @param {string} props.className Additional class names for the Loader.
 */
const AS_LOADER = ({
  active = true, 
  size = "large", 
  content = "Loading...", 
  inverted = true, 
  className = "", 
}) => {
  return (
    <Dimmer active={active} inverted={inverted} className={className}>
      <Loader size={size}>{content}</Loader>
    </Dimmer>
  );
};

export default AS_LOADER;
