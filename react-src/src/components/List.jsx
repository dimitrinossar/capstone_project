import '../css/List.css'

import {
  ListView,
  ListViewHeader,
  ListViewRow,
  ListViewFooter,
  Text,
} from 'react-desktop/macOs'

export default function List({ title, items, status }) {
  return (
    <ListView height="500" width="1100" margin="50" background="#f1f2f4">
      <ListViewHeader>
        <Text size="24" color="#696969">
          {title}
        </Text>
      </ListViewHeader>
      {items.map((item, index) => (
        <ListViewRow key={index}>
          <Text color="#414141" size="16">
            {item}
          </Text>
        </ListViewRow>
      ))}
      <ListViewFooter height="40">
        <Text size="20" color="#696969">
          {status}
        </Text>
      </ListViewFooter>
    </ListView>
  )
}
