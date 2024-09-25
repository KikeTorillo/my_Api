const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(201).json([
    {
      name: 'Luis Enrique',
      lastName: 'Arellanes',
      secondLastName: 'Torillo'
    },
    {
      name: 'Luis Enrique',
      lastName: 'Arellanes',
      secondLastName: 'Torillo'
    }
  ]);
})

module.exports = router;
