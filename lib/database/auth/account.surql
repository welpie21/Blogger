DEFINE SCOPE account
	SESSION 24h
	SIGNIN (  
		SELECT id, email, created_at, updated_at
		FROM user
		WHERE 
			username = $email AND 
			password = crypto::argon2::compare(pass, $pass)
	)
	SIGNUP (  
		CREATE user SET
			username = $email,
			password = crypto::argon2::generate($pass)
	)
;