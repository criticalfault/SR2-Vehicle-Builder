Attribute VB_Name = "FileOps"
Public Function CheckItem(f As Form, ItemType As Integer, Bookname As String, ItemName As String) As Boolean
    Dim s As String
    On Error Resume Next
    
    ' check if book is loaded
    NoBook = False
    test = BookC.Item(Bookname)
    If Err = 5 Then
        ' book not loaded
        NoBook = True
    End If
    
    ' check if mod is listed
    NoMod = False
    If ItemType = CHASSIS_TYPE Then
        test2 = ChassisC.Item(ItemName)
    ElseIf ItemType = ENGINE_TYPE Then
        test2 = EngineC.Item(ItemName)
    Else
        test2 = ModC.Item(ItemName)
    End If
    If Err = 5 Then
        ' mod not loaded
        NoMod = True
    End If
    
    If NoMod Then
        If NoBook Then
            s = "The '" & Bookname & "' book that defines the "
            If ItemType = CHASSIS_TYPE Then
                s = s & "'" & ItemName & "' chassis"
            ElseIf ItemType = ENGINE_TYPE Then
                s = s & ChassisC.Item(CStr(f.ChassisList)) & "/" & ItemName & " engine"
            Else
                s = s & "'" & ItemName & "' modification"
            End If
            s = s & " isn't loaded!"
            s = WordWrap(s, 60)
            MsgBox s
        Else
            s = "The '" & Bookname & "' book that's supposed to define the '" & ItemName & "'"
            If ItemType = CHASSIS_TYPE Then
                s = s & " chassis"
            ElseIf ItemType = ENGINE_TYPE Then
                s = s & " engine"
            Else
                s = s & " modification"
            End If
            s = s & " doesn't!"
            s = WordWrap(s, 60)
            MsgBox s
        End If
    Else
        If NoBook Then
            s = "The saved file expects the '" & ItemName & "'"
            If ItemType = CHASSIS_TYPE Then
                s = s & " chassis"
            ElseIf ItemType = ENGINE_TYPE Then
                s = s & " engine"
            Else
                s = s & " modification"
            End If
            s = s & " to be defined by '" & Bookname & "', but the one that's loaded is defined by the "
            If ItemType = CHASSIS_TYPE Then
                s = s & "'" & ChassisC.Item(ItemName).Book & "'"
            ElseIf ItemType = ENGINE_TYPE Then
                s = s & "'" & ChassisC.Item(CStr(f.ChassisList)).EngineC.Item(ItemName).Book & "'"
            Else
                s = s & "'" & ModC.Item(ItemName).Book & "'"
            End If
            s = s & " book"
            s = WordWrap(s, 60)
            MsgBox s
        End If
    End If
    If NoMod Then
        x = MsgBox("If you'd like me to load the " & Bookname & " book, click Yes" & Chr$(13) & _
                "If you'd rather I stuck in a dummy entry, click No" & Chr$(13) & _
                "Click Cancel to skip this item.", vbYesNoCancel)
        If x = vbYes Then
            ' load the missing book
            BookC.Add Bookname, Bookname
            LoadFile (Bookname)
            ChassisBookFilter.AddItem Bookname
            ModBookFilter.AddItem Bookname
            CheckItem = True
        ElseIf x = vbNo Then
            ' stick in a dummy mod
            If ItemType = CHASSIS_TYPE Then
                Set ecol = New Collection
                Set c = New ChassisClass
                Set c.EngineC = ecol
                c.ChassisName = ItemName
                ChassisC.Add c, ItemName
                f.ChassisList.AddItem ItemName
            ElseIf ItemType = ENGINE_TYPE Then
                Set e = New EngineClass
                e.EngineName = ItemName
                Set c = ChassisC.Item(CStr(f.ChassisList))
                c.EngineC.Add e, ItemName
                f.EngineList.AddItem ItemName
            Else
                Set m = New ModClass
                m.ModName = ItemName
                m.Priority = 1
                ModC.Add m, ItemName
            End If
            CheckItem = True
        Else
            CheckItem = False
        End If
    Else
        CheckItem = True
    End If
End Function

Public Sub ExportHTML(f As Form)
Dim fin As Integer, fout As Integer
Dim modidx As Integer
    
    On Error GoTo CancelExport
    ' open template file
    fin = FreeFile
    Open ShopDir & "\" & ShopTemplateFile For Input As fin
    ' OK - we've found the HTML template file now
    ' where do we save the result to?
    f.cmdiag.DefaultExt = ".htm"
    f.cmdiag.FilterIndex = 2
    f.cmdiag.Flags = cdlOFNOverwritePrompt + cdlOFNHideReadOnly + cdlOFNPathMustExist + cdlOFNLongNames
    
    x = InStr(f.cmdiag.Filename, ".")
    If x Then f.cmdiag.Filename = Left$(f.cmdiag.Filename, x - 1)
    
    f.cmdiag.ShowSave
    fout = FreeFile
    Open f.cmdiag.Filename For Output As fout
    
    ' Alright.  fin is the HTML template, fout
    ' is the final HTML

    On Error GoTo 0

    ' loop through entire file
    While Not EOF(fin)
        ' stupid VB file I/O can only
        ' handle raw (internal format) data
        ' or line-by-line modes, so we need to
        ' do this a line at a time.  Ick.
        Input #fin, line
        If line Like "[#]mods" Then
            ' grab a block
            block = ""
            line = ""
            While Not line Like "[#]end"
                block = block + line
                Input #fin, line
            Wend
            ' parse the block
            For modidx = 1 To f.Mods.ListCount
                Print #fout, ParseBlock(f, block, modidx)
            Next
        Else
            Print #fout, ParseBlock(f, line, 0)
        End If
    Wend

    ' make sure that we exit cleanly, no matter how
    ' we exit...
DoneExport:
    Close #fin
    Close #fout
    Exit Sub
CancelExport:
    'MsgBox "Error during export: " & Error
    Resume DoneExport
End Sub

Private Function ParseBlock(f As Object, ByVal block As String, modidx As Integer) As String
Dim xs As Integer, xe As Integer
Dim newline As String, expr As String

    ' copy everything until we hit a #
    xs = InStr(block, "#")
    If xs = 0 Then
        newline = block
    Else
        ' handle multiple expressions on one line
        newline = ""
        While Len(block) > 0
            ' ARBITRARY LIMIT: an expression
            ' must begin and end on the same line
            ' so, find matching #, or eol (error)
            If xs = 0 Then xs = InStr(block, "#")
            xe = InStr(xs + 1, block, "#")
            If xe = 0 Then
                ' no more exprs
                newline = newline + block
                block = ""
            Else
                ' feed stuff between ## to eval()
                newline = newline + Left$(block, xs - 1)
                expr = Mid$(block, xs + 1, xe - xs - 1)
                If modidx = 0 Then
                    newline = newline + CStr(Eval(f, expr))
                Else
                    x = Eval(f, "Global.modindex = " & modidx)
                    newline = newline + CStr(Eval(f, expr))
                End If
                block = Mid$(block, xe + 1)
            End If
            xs = 0
        Wend
    End If
    ParseBlock = newline
    Exit Function
End Function

Sub LoadVehicle(f As Form)
Dim ff As Integer
Dim temp As String, version As String
Dim ml As Integer, mn As String
Dim VersionNum As Single
Dim Bookname As String
    
Dim ambulance As Single, _
    ncv As Single, _
    unusual As Single, _
    luxury As Single, _
    special As Single

    On Error GoTo CancelLoad
    ' show the dialog box
    f.cmdiag.DefaultExt = ".shp"
    f.cmdiag.FilterIndex = 1
    f.cmdiag.Flags = cdlOFNFileMustExist + cdlOFNHideReadOnly + cdlOFNLongNames
    
    x = InStr(f.cmdiag.Filename, ".")
    If x Then f.cmdiag.Filename = Left$(f.cmdiag.Filename, x - 1)
    
    f.cmdiag.ShowOpen
    ' start writing the file
    ff = FreeFile
    Open f.cmdiag.Filename For Input As ff
    Input #ff, version     ' Get file id
    If Not version Like "Shop*" Then
        MsgBox f!cmdiag.Filename & " is not a valid Shop file."
        GoTo CancelLoad
    Else
        VersionNum = val(Mid$(version, 7))
    End If
    Input #ff, temp             ' Get vehicle name
    f.VName = temp
    
    ' set ChassisFilter to "All"
    f.ChassisFilter.ListIndex = 0
    f.ChassisFilter_change
    If VersionNum >= 1.4 Then
        Input #ff, Bookname, temp             ' Get chassis name
        check = CheckItem(f, CHASSIS_TYPE, Bookname, temp)
    Else
        Input #ff, temp             ' Get chassis name
        check = True
    End If
    ' find and select chassis
    If check Then ' just a time saver
        For idx = 0 To f.ChassisList.ListCount - 1
            If f.ChassisList.List(idx) = temp Then
                f.ChassisList.ListIndex = idx
            End If
        Next idx
    Else
        f.ChassisList.ListIndex = 0
    End If
    
    ' read in the engine name; might create dummy
    If VersionNum >= 1.4 Then
        Input #ff, Bookname, temp   ' Get engine name
        check = CheckItem(f, ENGINE_TYPE, Bookname, temp)
    Else
        Input #ff, temp             ' Get engine name
        check = True
    End If
    
    ' load list of appropriate engines
    f.ChassisList_Click
    
    ' find and select engine
    If check Then
        For idx = 0 To f.EngineList.ListCount - 1
            If f.EngineList.List(idx) = temp Then
                f.EngineList.ListIndex = idx
            End If
        Next idx
    Else
        f.EngineList.ListIndex = 0
    End If
    
    ' load seating and entry
    If VersionNum >= 1.26 Then
        Input #ff, temp
        f.Seating = temp
        Input #ff, temp
        f.Entry = temp
    End If
    
    ' load markups
    If VersionNum >= 1.2 Then
        Input #ff, ambulance, _
                    ncv, _
                    unusual, _
                    luxury, _
                    special
        If ambulance > 0 Then
            f.M_AmbulanceC = 1
        End If
        If ncv > 0 Then
            f.M_NCVC = 1
            f.M_NCV = ncv
        End If
        If unusual > 0 Then
            f.M_UnusualC = 1
            f.M_Unusual = unusual
        End If
        If luxury > 0 Then
            f.M_LuxuryC = 1
            f.M_Luxury = luxury
        End If
        If special > 0 Then
            f.M_SpecialC = 1
            f.M_Special = special
        End If
    End If
    
    ' Loop through mods
    ' ignore the user-readable stuff
    f.Mods.Clear
    While v.ModC.Count > 0
        v.ModC.Remove 1
    Wend
    While Not EOF(ff)
NextLine:
        If VersionNum >= 1.4 Then
            Input #ff, Bookname, ml, mn
            If CheckItem(f, MOD_TYPE, Bookname, mn) Then
                v.ModC.Add ModC.Item(mn), mn
                v.ModC.Item(mn).Level = ml
                f.Mods.AddItem mn
            End If
        Else
            Input #ff, ml, mn
            v.ModC.Add ModC.Item(mn), mn
            v.ModC.Item(mn).Level = ml
            f.Mods.AddItem mn
        End If
    Wend
    
    ' Go through the stats (purely for human-readable stuff)
    ' Ah, I'll do it later.
    
    f.Recalc
CancelLoad:
    Close #ff
    Exit Sub
End Sub

Sub SaveVehicle(f As Form)
Dim ff As Integer
    On Error GoTo CancelSave
    ' show the dialog box
    f.cmdiag.DefaultExt = ".shp"
    f.cmdiag.FilterIndex = 1
    f.cmdiag.Flags = cdlOFNOverwritePrompt + cdlOFNHideReadOnly + cdlOFNPathMustExist + cdlOFNLongNames
    
    x = InStr(f.cmdiag.Filename, ".")
    If x Then f.cmdiag.Filename = Left$(f.cmdiag.Filename, x - 1)
    
    f.cmdiag.ShowSave
    ' start writing the file
    ff = FreeFile
    Open f.cmdiag.Filename For Output As ff
    Write #ff, "Shop v1.40"
    Write #ff, f.VName            ' Write vehicle name
    Write #ff, ChassisC.Item(f.ChassisList).Book, f.ChassisList      ' Write chassis name
    Write #ff, ChassisC.Item(f.ChassisList).EngineC.Item(f.EngineList).Book, f.EngineList       ' Write engine name
    Write #ff, f.Seating          ' Write seating info
    Write #ff, f.Entry            ' Write entry info
    Write #ff, CInt(f.M_AmbulanceC), _
                f.M_NCVC * CSng(f.M_NCV), _
                f.M_UnusualC * CSng(f.M_Unusual), _
                f.M_LuxuryC * CSng(f.M_Luxury), _
                f.M_SpecialC * CSng(f.M_Special)
    
    ' Loop through mods
    For idx = 1 To v.ModC.Count
        Write #ff, v.ModC.Item(idx).Book, v.ModC.Item(idx).Level, v.ModC.Item(idx).ModName
    Next idx

    ' Go through the stats (purely for human-readable stuff)
    ' Ah, I'll do it later.

CancelSave:
    Close #ff
    Exit Sub
End Sub

