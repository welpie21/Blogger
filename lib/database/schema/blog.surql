DEFINE TABLE IF NOT EXISTS blog
	SCHEMAFULL
	PERMISSIONS FOR
		select WHERE (published=false AND author.id = $auth.id) OR published=true,
		update, delete WHERE author.id = $auth.id;

-- The representation of a blog post.
DEFINE FIELD title ON blog TYPE string;

-- The url friendly representation of the title
DEFINE FIELD slug ON blog TYPE string
	VALUE string::slug($value.title);

-- The content of the blog post.
DEFINE FIELD content ON blog TYPE string;

-- The content source of the blog post.
DEFINE FIELD source ON blog TYPE string;

-- Wether the blog post has been published or not.
DEFINE FIELD published ON blog TYPE boolean;

-- The author of the blog post.
DEFINE FIELD author ON blog TYPE record<user>;

-- The header image of the blog post.
DEFINE FIELD thumbnail ON blog TYPE string;

-- The date the blog post was created.
DEFINE FIELD created_at ON blog TYPE datetime 
	DEFAULT time::now();

-- The date the blog post was last updated.
DEFINE FIELD updated_at ON blog TYPE datetime 
	DEFAULT time::now() 
	VALUE time::now();