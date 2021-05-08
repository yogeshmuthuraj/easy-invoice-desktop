import React from 'react';
import PropTypes from 'prop-types';

import '@shopify/polaris/dist/styles.css';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import RefreshIcon from '@material-ui/icons/Refresh';

import OrderDisplay from './OrderDisplay';
import SkeletonPageTemplate from './SkeletonPageTemplate';

class FetchOrders extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
    };
  }

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders() {
    const sessionToken = sessionStorage.getItem('sessionToken');
    const headers = new Headers({ Authorization: `Bearer ${sessionToken}` });

    fetch('/orders', { headers })
      .then((response) => response.json())
      .then(
        (data) => {
          const { orders } = data;

          if (orders === undefined || orders.length == 0) {
            this.setState({
              isLoaded: true,
              error: true,
            });
          } else {
            this.setState({
              isLoaded: true,
              items: orders,
            });
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleRefresh() {
    this.setState({
      isLoaded: false,
      error: null,
    });

    this.fetchOrders();
  }

  render() {
    const { error, isLoaded, items } = this.state;

    let content;

    if (error) {
      content = (
        <Alert severity="error" style={{ fontSize: '20px' }}>
          <AlertTitle style={{ fontSize: '20px' }}>Error</AlertTitle>
          Loading error — <strong>Reload</strong>
          <IconButton
            aria-label="delete"
            onClick={() => {
              this.handleRefresh();
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Alert>
      );
    } else if (!isLoaded) {
      content = <SkeletonPageTemplate fullWidth />;
    } else {
      content = <OrderDisplay rows={items} from="fetchOrders" />;
    }

    return <div>{content}</div>;
  }
}

export default FetchOrders;
