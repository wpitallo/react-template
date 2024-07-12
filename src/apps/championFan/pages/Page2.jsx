import PageTemplate from './PageTemplate';
import PropTypes from 'prop-types'

function Page({ isVisible }) {
  return (
    <PageTemplate isVisible={isVisible}>
      <h1>Page 2</h1>
      {/* Your page content */}
    </PageTemplate>
  );
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Page;