VERSION 4.00
Begin VB.Form ManageBooks 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Manage Books"
   ClientHeight    =   2655
   ClientLeft      =   1455
   ClientTop       =   2805
   ClientWidth     =   3450
   Height          =   3060
   Icon            =   "ManageBooks.frx":0000
   Left            =   1395
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   2655
   ScaleWidth      =   3450
   Top             =   2460
   Width           =   3570
   Begin VB.CommandButton CancelButton 
      Cancel          =   -1  'True
      Caption         =   "&Cancel"
      Height          =   315
      Left            =   1980
      TabIndex        =   5
      Top             =   2280
      Width           =   1395
   End
   Begin VB.CommandButton OKButton 
      Caption         =   "&OK"
      Default         =   -1  'True
      Height          =   315
      Left            =   60
      TabIndex        =   4
      Top             =   2280
      Width           =   1395
   End
   Begin VB.CommandButton RemoveButton 
      Caption         =   "<<"
      Height          =   735
      Left            =   1500
      TabIndex        =   2
      Top             =   1380
      Width           =   435
   End
   Begin VB.CommandButton AddButton 
      Caption         =   ">>"
      Height          =   735
      Left            =   1500
      TabIndex        =   1
      Top             =   540
      Width           =   435
   End
   Begin VB.ListBox UsedList 
      Height          =   1620
      Left            =   1980
      Sorted          =   -1  'True
      TabIndex        =   3
      Top             =   480
      Width           =   1395
   End
   Begin VB.ListBox UnusedList 
      Height          =   1620
      Left            =   60
      Sorted          =   -1  'True
      TabIndex        =   0
      Top             =   480
      Width           =   1395
   End
   Begin VB.Label Label2 
      Caption         =   "Books in use"
      Height          =   255
      Left            =   1980
      TabIndex        =   7
      Top             =   120
      Width           =   1155
   End
   Begin VB.Label Label1 
      Caption         =   "Unused books"
      Height          =   255
      Left            =   60
      TabIndex        =   6
      Top             =   120
      Width           =   1155
   End
End
Attribute VB_Name = "ManageBooks"
Attribute VB_Creatable = False
Attribute VB_Exposed = False
Private Sub AddButton_Click()
    If Unusedlist.ListCount > 0 Then
        On Error Resume Next
'        UnusedBookC.Remove Unusedlist
'        BookC.Add Unusedlist, Unusedlist
        
        UsedList.AddItem Unusedlist
        Unusedlist.RemoveItem Unusedlist.ListIndex
        UsedList.ListIndex = UsedList.ListCount - 1
    End If
End Sub

Private Sub CancelButton_Click()
    Unload Me
End Sub

Private Sub Form_Load()
Dim DataFile, ShopFile
Dim rowtype
Dim NewFile As String
Dim Filename As String, Filename_dat As String
Dim cline As String
Dim c

    ' set position
    Me.Left = Shop.Left + (Shop.Width - Me.Width) / 2
    Me.Top = Shop.Top + (Shop.Height - Me.Height) / 2


    ' Open Shop.dat for appending
    ShopFile = FreeFile
    Open ShopDir & "\" & ShopDataFile & DATA_EXT For Append As ShopFile
    ' Find all .dat files in the current directory
    Filename_dat = Dir("*.dat")
    While Filename_dat <> ""
        ' Exclude Shop.dat
        If Filename_dat <> "Shop.dat" Then
            ' If they're not listed as possible in Shop.dat,
            ' add them (as unloaded)
            On Error Resume Next
            Filename = Left$(Filename_dat, Len(Filename_dat) - 4)
            c = BookC.Item(Filename)
            If Err Then
                Err = 0
                c = UnusedBookC.Item(Filename)
                If Err Then
                    On Error GoTo 0
                    DataFile = FreeFile
                    Open Filename_dat For Input As DataFile
                    
                    ' The first line of the file is the description
                    cline = ""
                    c = ""
                    While c <> Chr$(10) And c <> Chr$(13) And Not EOF(DataFile)
                        cline = cline & c
                        c = Input(1, #DataFile)
                    Wend
                    Close #DataFile
                    Print #ShopFile,
                    Print #ShopFile, "#" & FirstLine
                    Print #ShopFile, UNUSED_BOOK_ROW & ",""" & Filename & """"
'                    cline = Chr$(10) & _
                        "#" & cline & Chr$(10) & _
                        UNUSED_BOOK_ROW & ",""" & Filename & """" & _
                        Chr$(10)
'                    Print #ShopFile, cline
                End If
            End If
        End If
        Filename_dat = Dir
    Wend
    Close #ShopFile
            
    ' Read Shop.dat
    UsedList.Clear
    Unusedlist.Clear
    DataFile = FreeFile
    Open ShopDir & "\" & ShopDataFile & DATA_EXT For Input As DataFile
    While Not EOF(DataFile)
        rowtype = Input(1, #DataFile)
        ' if the rowtype is "\r" or "\n", ignore it
        If rowtype = Chr$(13) Or rowtype = Chr$(10) Then
        ' if rowtype is #, eat the line
        ElseIf rowtype = COMMENT_ROW Then
            While rowtype <> Chr$(10) And Not EOF(DataFile)
                rowtype = Input(1, #DataFile)
            Wend
        Else
            ' eat the comma that must follow it
            x = Input(1, #DataFile)
            
            ' Sort books into Used/Unused lists
            If rowtype = BOOK_ROW Or rowtype = CStr(BOOK_TYPE) Then
                ' load it into the "Used" list if it exists
                Input #DataFile, NewFile
                If Dir(NewFile & ".dat") <> "" Then _
                    UsedList.AddItem NewFile
            ElseIf rowtype = UNUSED_BOOK_ROW Then
                ' load it into the "Unused" list if it exists
                Input #DataFile, NewFile
                If Dir(NewFile & ".dat") <> "" Then _
                    Unusedlist.AddItem NewFile
            End If
        End If
    Wend
    Close #DataFile
End Sub

Private Sub OKButton_Click()
Dim ShopFile
Dim rowtype
Dim c As String, name As String
    ' reset BookC and UnusedBookC
    'BookC.Clear
    While BookC.Count > 0
        BookC.Remove 1
    Wend
    While UnusedBookC.Count > 0
        UnusedBookC.Remove 1
    Wend
    For i = 0 To UsedList.ListCount - 1
        BookC.Add UsedList.List(i), UsedList.List(i)
    Next i

    ' rewrite Shop.dat
    ' Write a temp file & rename?
    ' or search and edit?
    ShopFile = FreeFile
    Open ShopDir & "\" & ShopDataFile & DATA_EXT For Binary As ShopFile
    ' Get will use the contents of c as a template for how
    ' much data to read
    c = " "
    On Error Resume Next
    While Not EOF(ShopFile)
        Get #ShopFile, , c
        If c = BOOK_TYPE Or c = BOOK_ROW Or c = UNUSED_BOOK_ROW Then
            ' seek back a char
            rowtype = Seek(ShopFile) - 1
            ' find out what book it was
            ' ","
            Get #ShopFile, , c
            ' "\""
            Get #ShopFile, , c
            Get #ShopFile, , c
            name = ""
            While c <> """"
                name = name + c
                Get #ShopFile, , c
            Wend
            Err = 0
            foo = BookC.Item(name)
            If Err Then
                ' Unused
                Put #ShopFile, rowtype, UNUSED_BOOK_ROW
            Else
                ' Used
                Put #ShopFile, rowtype, BOOK_ROW
            End If
        End If
        ' seek to the end of the line
        While c <> Chr$(10) And Not EOF(ShopFile)
            Get #ShopFile, , c
        Wend
    Wend
    Close #ShopFile
    Unload Me
End Sub

Private Sub RemoveButton_Click()
    If UsedList.ListCount > 0 Then
        On Error Resume Next
'        UnusedBookC.Add UsedList, UsedList
'        BookC.Remove UsedList
        
        Unusedlist.AddItem UsedList
        UsedList.RemoveItem UsedList.ListIndex
        Unusedlist.ListIndex = Unusedlist.ListCount - 1
    End If
End Sub

Private Sub Unusedlist_DblClick()
    AddButton_Click
End Sub

Private Sub UsedList_DblClick()
    RemoveButton_Click
End Sub
