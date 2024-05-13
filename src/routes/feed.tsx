import { useEffect, useState } from "react";
import ProfileCard from "../components/profile_card";
import { PostList, Profile } from "../services/entities";
import { PostService } from "../services/post.service";
import PostCard from "../components/post";
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Skeleton, TextField } from "@mui/material";
import { HttpPostService } from "../services/http_post.service";
import { Link } from "react-router-dom";
import React from "react";

const postService: PostService = new HttpPostService;


export default function Feed(this: any, props: { user: Profile, isPublic: boolean }) {
    // implement hooks
    const [postList, setList] = useState<PostList>([]);
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [dialogContent, setContent] = useState('');
    const [selected, setSelected] = useState(0);

    const profile = props.user;

    function handleClickOpen(id: number, content: string) {
        setContent(content);
        setSelected(id);
        setOpen(true);
    };

    const handleTextFieldChange = (event: { target: { value: any; }; }) => { 
        setContent(event.target.value); 
      }; 

    const handleClose = () => {
        setContent('');
        setSelected(0);
        setOpen(false);
    };

    async function handleUpdate(){
        await postService.updatePost(selected, dialogContent);
        setContent('');
        setSelected(0);
        setOpen(false);
        listPosts();
    }

    async function listPosts() {
        try {
            setLoading(true);
            await postService.getAllPosts().then(d => {
                setList(d);
            });

        } catch (error) {
            console.log(error);
        };
        setLoading(false);
    }

    async function deletePost(id: number) {
        console.log(id);
        await postService.deletePost(id);
        listPosts();
    }

    useEffect(() => {
        listPosts();
    }, []);



    if (props.isPublic) {
        return (
            <>
                {loading ? (
                    <>
                        <Skeleton animation="wave" variant="rounded" width={300} height={300} sx={{ margin: 1 }} />
                    </>
                ) : (
                    <><div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Card variant="outlined" style={{ display: 'flex', flexDirection: 'column', height: '200px', width: '200px', justifyContent: 'center', alignItems: 'center', padding: '20px', margin: '0 20px' }}>
                            <h3>Login to make a post!</h3>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#F5BE41' }}
                            ><Link to={"/login"} style={{ color: 'black' }}>Login</Link></Button>
                        </Card>
                        <div id="posts">
                            {postList.map((value) => {
                                return <PostCard post={value} poster={false} deletePost={deletePost} handleDialog={handleClickOpen} />;
                                
                            })}
                        </div>
                    </div>

                    </>
                )
                }
            </>
        )
    } else {
        return (
            <>
                {loading ? (
                    <>
                        <Skeleton animation="wave" variant="rounded" width={300} height={300} sx={{ margin: 1 }} />
                    </>
                ) : (
                    <><div style={{ display: 'flex', flexDirection: 'row' }}>
                        <ProfileCard location="main" user={profile} />
                        <div id="posts">
                            {postList.map((value) => {
                                if (value.user_id == profile.user_id) {
                                    return <PostCard post={value} poster={true} deletePost={deletePost} handleDialog={handleClickOpen} />;
                                } else {
                                    return <PostCard post={value} poster={false} deletePost={deletePost} handleDialog={handleClickOpen} />;
                                }
                            })}
                        </div>
                    </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries((formData as any).entries());
                                    const email = formJson.email;
                                    console.log(email);
                                    handleClose();
                                },
                            }}
                            sx={{
                                "& .MuiDialog-container": {
                                  "& .MuiPaper-root": {
                                    width: "100%",
                                    minWidth: "500px",  // Set your width here
                                  },
                                },
                              }}
                        >
                            <DialogTitle>Edit Your Post</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="content"
                                    label="Update Content"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                    defaultValue={dialogContent}
                                    onChange={handleTextFieldChange}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleUpdate}>Update</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                )
                }
            </>
        );
    }

}