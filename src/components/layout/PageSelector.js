import React from "react";

import { Pagination } from "semantic-ui-react";

export default function PageSelector(props) {
  function onPageChangeHandler() {
    props.onPageChange();
  }

  return (
    <Pagination
      boundaryRange={0}
      defaultActivePage={props.activePage}
      onPageChange={onPageChangeHandler}
      ellipsisItem={null}
      firstItem={null}
      lastItem={null}
      siblingRange={1}
      totalPages={props.totalPages}
    />
  );
}
