
app.get('/posts', cacheMiddleware, async (req, res) => {
    try {
      // Your database call to retrieve posts
      const posts = await getPostsFromDatabase();
  
      // Sort the posts based on some criteria (e.g., by post ID)
      const sortedPosts = sortPosts(posts);
  
      // Store the retrieved and sorted data in the cache with a key
      const key = req.originalUrl || req.url;
      cache.put(key, sortedPosts, 10 * 60 * 1000); // Cache for 10 minutes
  
      res.json(sortedPosts);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  function sortPosts(posts) {
    return posts.sort((a, b) => a.id.localeCompare(b.id));
  }