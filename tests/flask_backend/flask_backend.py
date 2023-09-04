from flask import Flask, request
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3000"])

@app.post("/get_news")
def get_news_by_title():
    try:
        request_data = json.loads(request.data)
    except:
        request_data = ""
    
    print("Request Data:", request_data)

    return_json = { 
        "body": ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam. Nam et erat sollicitudin, luctus sem vitae, viverra libero. Etiam justo dui, commodo ac ex et, malesuada cursus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In posuere risus sit amet urna ultrices, nec sollicitudin nisi aliquam. Integer ultricies lacus velit, et fermentum elit eleifend vitae. Vivamus aliquet venenatis mauris, ut finibus nibh vehicula ut. Morbi quis commodo augue. Pellentesque porttitor est a pretium commodo. Cras non nisl nec quam ornare fermentum ut nec est. Praesent commodo eget ex nec vulputate. Etiam a neque at dui vehicula consequat vitae varius arcu. Pellentesque nec eros vulputate, pulvinar tellus non, ullamcorper lorem. Pellentesque fringilla elit nec posuere efficitur. Suspendisse porttitor pretium magna in vestibulum. Pellentesque scelerisque erat id odio tincidunt accumsan. Pellentesque finibus semper odio id lobortis. In sapien augue, congue vel euismod sit amet, ornare vel nibh. Mauris eget faucibus ipsum, vitae gravida enim. Cras orci dui, ullamcorper vel turpis id, porta vestibulum enim. Nunc lectus mi, eleifend scelerisque finibus et, dignissim eget quam. Pellentesque volutpat orci a libero faucibus, sit amet rhoncus arcu dignissim."] * 5,
        "link": "https://bloomberg.com/new1",
        "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor est a pretium commodo. Nunc lectus mi, eleifend scelerisque finibus et, dignissim eget quam.",
        "sentiment": {"negative": 0.97, "neutral": 0.02, "positive": 0.01},
    }
    print(return_json)

    return return_json


@app.post("/get_briefing")
def get_briefings():
    try:
        request_data = json.loads(request.data)
    except:
        request_data = ""

    print("Request Data:", request_data)

    named_entities = """
		<div>
			<body style="font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; padding: 4rem 2rem; direction: ltr">
				<figure style="margin: 0%">
					<div class="entities" style="line-height: 2.5; direction: ltr">
						<mark class="entity" style="background: #aa9cfc; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;">Lorem Ipsum Dolor's <span style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem">PERSON</span></mark>habitant morbi<mark class="entity" style="background: #feca74; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;">Ultricies<span style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem">GPE</span></mark>'s <mark class="entity" style="background: #7aecec; padding: 0.45em 0.6em; margin: 0 0.25em; line-height: 1; border-radius: 0.35em;">Fermentum Elit<span style="font-size: 0.8em; font-weight: bold; line-height: 1; border-radius: 0.35em; vertical-align: middle; margin-left: 0.5rem">ORG</span></mark> turpis egestas.
					</div>
				</figure>
			</body>
		</div>
	"""
    chatgpt_exp = {"Lorem Ipsum Dolor's ": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam.", "Ultricies": "Dolor sit amet", "Fermentum Elit": "Consectetur adipiscing elit"}

    news1 = {
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porttitor est a pretium", 
        "teaser": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam. Nam et erat sollicitudin, luctus sem vitae, viverra libero. Etiam justo dui, commodo ac ex et, malesuada cursus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In posuere risus sit amet urna ultrices, nec sollicitudin nisi aliquam. Integer ultricies lacus velit, et fermentum elit eleifend vitae.",
        "publish_date": "August 27, 2023",
        "link": "http://www.loremipsum.com",
        "ner_highlightings": named_entities,
        "chatgpt_explanations": chatgpt_exp 
    }
    news2 = {
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam.", 
        "teaser": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam. Nam et erat sollicitudin, luctus sem vitae, viverra libero. Etiam justo dui, commodo ac ex et, malesuada cursus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "publish_date": "August 27, 2023",
        "link": "http://www.loremipsum.com",
        "ner_highlightings": named_entities,
        "chatgpt_explanations": chatgpt_exp 
    }
    news3 = {
        "title": "Lorem ipsum dolor sit amet", 
        "teaser": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat, eros eget lacinia ultrices, diam ipsum luctus ex, nec pulvinar risus odio sit amet diam. Nam et erat sollicitudin, luctus sem vitae, viverra libero. Etiam justo dui, commodo ac ex et, malesuada cursus massa. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "publish_date": "August 27, 2023",
        "link": "http://www.loremipsum.com",
        "ner_highlightings": named_entities,
        "chatgpt_explanations": chatgpt_exp 
    }

    return_json = {
        "news": [news1, news2, news3, news1, news2, news3, news1, news2, news3, news1, news2, news3],
        "trends": {
            "trending_topics": ["Lorem ipsum", "Dolor sit amet"],
            "people_and_groups": ["Consectetur adipiscing", "Donec volutpat"],
            "popular_firms": ["Eros", "Eget", "Lacinia"],
            "popular_places": ["Ultrices", "Diam", "Luctus"],
            "popular_products": ["Pulvinar"],
            "popular_events": ["Risus odio sit"],
        },
        "stats": {
            "sentiment": {
                "positive": 0.03,
                "neutral": 0.10,
                "negative": 0.87,
            }
        }
    }

    print(return_json)

    return return_json


if __name__ == "__main__":
    app.run()