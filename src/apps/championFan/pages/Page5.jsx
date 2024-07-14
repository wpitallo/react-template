import PageTemplate from './PageTemplate';
import PropTypes from 'prop-types'
import templateStyles from './PageTemplate.module.scss';

function Page({ isVisible }) {
  return (
    <PageTemplate isVisible={isVisible}>
      <h1 className={templateStyles.header1}>Page 5</h1>
      {/* Your page content */}
    </PageTemplate>
  );
}

Page.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default Page;