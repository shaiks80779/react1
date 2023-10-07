import React, { useEffect, useState } from 'react'
import { Icon, Button, List } from 'semantic-ui-react'

export default function Newsoffset() {
	const [loading, setloading] = useState(true)
	const [x, setx] = useState(0)
	const [list, setlist] = useState([])

	useEffect(() => {
		let data = {
			_fields: 'id,title,jetpack_featured_media_url',
			per_page: 10,
			offset: x
		}
		const params = new URLSearchParams(data).toString()
		const url = 'https://telugunewsadda.com/wp-json/wp/v2/posts?'

		setloading(true)
		fetch(url + params)
			.then(res => res.json())
			.then(json => {
				setlist(json)
				setloading(false)
			})
	}, [x])

	function handlenext() {
		setx(x + 10)
	}
	function handleprev() {
		if (x >= 10) {
			setx(x - 10)
		}
	}


	return (
		<div>
			{x > 0 ? <Button color='pink' onClick={handleprev}>Previous</Button> : ''}
			{x < 100 ? <Button color='blue' onClick={handlenext}>Next</Button> : ''}
			<hr />

			<List divided relaxed>

				{
					loading ? <Icon loading size='huge' color='blue' name='spinner' />
						:
						list.map((item) => {
							return (
								<List.Item key={item.id} style={{ padding: 20 }}>
									<List.Icon name='user' size='large' verticalAlign='middle' />
									<List.Content>
										<List.Header>{item.title.rendered}</List.Header>
									</List.Content>
								</List.Item>
							)
						})
				}

			</List>
		</div>
	)
}