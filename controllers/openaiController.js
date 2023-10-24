const openai = require('../config/openaiConfig')

const generateMeta = async (req, res) => {
    const { title } = req.body

    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "user", 
            "content": `描述所问的事物: ${title}`
          }
        ],
      });
    // console.log(description.choices[0].message);

    const tags = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user", 
          "content": `给出所问事物${title}的5个关键词`
        }
      ],
    });
  // console.log(tags.choices[0].message);
  res.status(200).json({
    description: description.choices[0].message, 
    tags: tags.choices[0].message
  })
}

const generateImage = async (req, res) => {
  const image = await openai.images.generate({
    prompt: req.body.prompt,
    n: 1,
    size: '512x512'
  })

  // console.log(image.choices[0].url);
  res.status(200).json({
    image: image.choices[0].url
  })
}


module.exports = { generateMeta, generateImage }