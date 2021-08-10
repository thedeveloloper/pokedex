import React, { useState, useEffect } from "react";

import { Search } from "semantic-ui-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return <Search />;
}
