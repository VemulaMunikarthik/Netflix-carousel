from flask import Flask, jsonify, render_template, url_for,request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/carousel-data', methods=['GET'])
def get_carousel_data():
    page_size = int(request.args.get('pageSize', 3))
    data = [
        {"id": 1, "name": "Image 1", "image": url_for('static', filename='img1.jpg')},
        {"id": 2, "name": "Image 2", "image": url_for('static', filename='img2.jpg')},
        {"id": 3, "name": "Image 3", "image": url_for('static', filename='img3.jpg')},
        {"id": 4, "name": "Image 4", "image": url_for('static', filename='img4.jpg')},
        {"id": 5, "name": "Image 5", "image": url_for('static', filename='img5.jpg')},
        {"id": 6, "name": "Image 6", "image": url_for('static', filename='img6.jpg')},
        {"id": 7, "name": "Image 7", "image": url_for('static', filename='img7.jpg')},
        {"id": 8, "name": "Image 8", "image": url_for('static', filename='img8.jpg')},
        {"id": 9, "name": "Image 9", "image": url_for('static', filename='img9.jpg')}

        # Add more images as needed
    ]
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
