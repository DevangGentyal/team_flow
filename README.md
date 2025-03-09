#  Team Flow  
🚀 A modern **Project & Team Management** platform for students and guides to streamline project tracking, team collaboration, and subject-based team structuring.  

<div align="center">
  <img src="https://source.unsplash.com/900x400/?team,technology" alt="Team Flow Banner" width="100%">
</div>

---

## ✨ Features  
✅ **Guide Dashboard**: Manage subjects, create teams, generate team codes.  
✅ **Student Dashboard**: Join teams, track progress, upload project-related files.  
✅ **Minimal UI**: Inspired by Figma, ElevenLabs, WebFlow – clean, bold, and modern.  
✅ **Secure Authentication**: Students and Guides log in with verified credentials.  
✅ **Task & Progress Tracking**: Simple milestone-based updates instead of overwhelming reports.  

---

## 📁 Project Structure  
```
/team-flow
│ꀀ /public         # Static assets (logos, illustrations)
│ꀀ /components     # Reusable UI components
│ꀀ /pages          # Next.js routing pages
│ꀀ /styles         # Tailwind CSS for styling
│ꀀ /utils          # Helper functions
│ꀀ README.md       # You're here!
│ꀀ package.json    # Project dependencies
│ꀀ next.config.js  # Next.js configuration
│ꀀ .env            # Environment variables (not committed)
```

---

## 🚀 Getting Started  
### 1⃣ Clone the Repository  
```bash
git clone https://github.com/DevangGentyal/Team-Flow.git
cd Team-Flow
```
### 2⃣ Install Dependencies  
```bash
npm install
```
### 3⃣ Configure Environment Variables  
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/team_flow"
```
Replace:
- `USER` with your MySQL username
- `PASSWORD` with your MySQL password
- `HOST` with your database host (e.g., `localhost` or a remote server)
- `PORT` with the MySQL port (default is `3306`)
- `DATABASE` with your database name

### 4⃣ Run the Development Server  
```bash
npm run dev
```
Now open [http://localhost:3000](http://localhost:3000) in your browser! 🎉  

---

## 📌 Future Enhancements  
- 🔹 **Real-time Chat** (for better student-guide communication)  
- 🔹 **AI-Powered Task Recommendations**  
- 🔹 **Integrations with Google Drive for File Management**  

---

## 🙌 Contributing  
Contributions are welcome! Fork the repo and submit a PR. 😊  

---

## 🛠 Tech Stack  
- **Next.js** - Frontend framework  
- **Tailwind CSS** - Styling  
- **Prisma** - Authentication & Database  
- **MySQL** - Database  

---

💙 **Built with passion by Team Flow Developers** 🚀

