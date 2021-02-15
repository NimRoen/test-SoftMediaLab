import { Component } from 'react';
import ReactDOM from 'react-dom';

type Props = {
  onMount: () => void;
};

class ModalPortal extends Component<Props> {
  node?: HTMLDivElement = undefined;

  constructor(props: Props) {
    super(props);

    if (typeof document !== 'undefined') {
      this.node = document.createElement('div');
    }
  }

  componentDidMount() {
    const { onMount } = this.props;

    if (this.node) {
      document.body.appendChild(this.node);
      onMount();
    }
  }

  componentWillUnmount() {
    if (this.node) document.body.removeChild(this.node);
  }

  render() {
    if (!this.node) return null;

    const { children } = this.props;
    const portal = ReactDOM.createPortal(children, this.node);

    return <div>{portal}</div>;
  }
}

export default ModalPortal;
